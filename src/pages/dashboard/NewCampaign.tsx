import React, { useCallback, useState, useEffect, FC } from "react";
import { TextField, IconButton, CircularProgress } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PrimaryButton, { OutlineButton } from "shared/Buttons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createCampaign,
  uploadMedia,
  recordMediaToCampaign,
} from "lib/apiService";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatDate } from "utils/date";
import { useDropzone } from "react-dropzone";
import pngIcon from "assets/upload-media.png";

interface IPropsFile {
  control: any;
  name: string;
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  errors: any;
}

const FileInput: FC<IPropsFile> = ({
  control,
  name,
  setImagePreviews,
  errors,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      const previews = imageFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    },
    [setImagePreviews]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <>
          <div
            {...getRootProps()}
            className='rounded-[12px] p-3'
            style={{ border: "2px dashed #828282" }}
          >
            <input
              {...getInputProps()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.files);
                onDrop([...(e as any).target.files]);
              }}
            />
            <div
              onClick={open}
              className='bg-[#E7E7E7] p-4 flex flex-col items-center justify-center py-14'
              style={{ border: "2px dashed #fff" }}
            >
              <img src={pngIcon} className='w-[68.98px]' alt='upload icon' />
              <p className='text-center text-[#000000] opacity-50 text-[14px] font-[400]'>
                <span style={{ color: "#fd7557", opacity: "100% !important" }}>
                  Upload a file
                </span>{" "}
                or drag and drop PNG, JPG, GIF, MP4 up to 10MB
              </p>
            </div>
          </div>
          {errors[name] && (
            <p className='text-red-500 text-xs mt-1'>{errors[name]?.message}</p>
          )}
        </>
      )}
    />
  );
};

const schema = yup.object().shape({
  campaignName: yup.string().required("Campaign Name is required"),
  campaignDescription: yup
    .string()
    .required("Campaign Description is required"),
  images: yup
    .mixed()
    .test(
      "required",
      "You need to provide at least one image",
      (value: any) => value && value.length > 0
    ),
});

const NewCampaign: React.FC = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCampaignId] = useState<string | null>(null);
  const selectedSubPlanId = localStorage.getItem("selectedPlanId");
  const accessToken = localStorage.getItem("accessToken");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      campaignName: "",
      campaignDescription: "",
      images: [],
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("campaignData");
    if (savedData) {
      const { name, description, images } = JSON.parse(savedData);
      setValue("campaignName", name);
      setValue("campaignDescription", description);
      setImagePreviews(images);
    }
  }, [setValue]);

  const createAndUploadCampaign = async (
    data: FieldValues,
    isDraft: boolean
  ) => {
    if (!selectedSubPlanId || !accessToken) {
      toast.error("Missing required data");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Creating campaign with data:", data);
      // First API call to create the campaign
      const response = await createCampaign({
        name: data.campaignName,
        description: data.campaignDescription,
        sub_plan_id: selectedSubPlanId,
        is_draft: isDraft,
      });

      if (response.status === 200 || response.status === 201) {
        const campaignId = response.data.data.id;
        setCampaignId(campaignId);

        console.log("Campaign created with ID:", campaignId);

        // Second API call to upload media
        if (data.images.length > 0) {
          const formData = new FormData();
          data.images.forEach((image: File, index: number) => {
            formData.append(`upload`, image);
          });

          const mediaResponse = await uploadMedia(formData);

          if (mediaResponse.status === 200 || mediaResponse.status === 201) {
            console.log("Media uploaded:", mediaResponse.data);
            const mediaDetails = mediaResponse.data.map((media: any) => ({
              public_id: media.public_id,
              width: media.width,
              height: media.height,
              format: media.format,
              resource_type: media.resource_type,
              bytes: media.bytes,
              type: media.type,
              etag: media.etag,
              secure_url: media.secure_url,
            }));

            await recordMediaToCampaign(campaignId, {
              public_ids: mediaDetails,
            });
            console.log("Media recorded to campaign");
          }
        }

        toast.success(
          isDraft
            ? "Campaign saved as draft successfully!"
            : "Campaign published successfully! Media uploaded."
        );
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      toast.error(error.response ? error.response.data.error : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAsDraft = async (data: FieldValues) => {
    console.log("nzubechi");
    await createAndUploadCampaign(data, true);
  };

  const publishAds = async (data: FieldValues) => {
    await createAndUploadCampaign(data, false);
  };

  const removeImage = (index: number) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const todayDate = new Date();

  return (
    <div className='py-4'>
      <ToastContainer />
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <div>
          <h5 className='text-[22px]'>New Campaign</h5>
          <p className='text-[14px] text-[#000000] opacity-50'>
            {formatDate(todayDate)}
          </p>
        </div>
        <div className='flex items-center mt-4 md:mt-0'>
          <OutlineButton
            className='h-[40px] mr-1 px-4'
            onClick={handleSubmit(saveAsDraft)}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Save as draft"}
          </OutlineButton>
          <PrimaryButton
            className='ml-3 h-[40px] px-4'
            onClick={handleSubmit(publishAds)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Publish Ads"}
          </PrimaryButton>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row items-start justify-between gap-4 w-full mt-5'>
        <div className='w-full lg:w-1/2 bg-white p-6 lg:p-10 rounded-[12px] shadow-lg'>
          <Controller
            name='campaignName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Campaign Name'
                InputLabelProps={{ shrink: true }}
                placeholder='Clothing Advertisement'
                fullWidth
                variant='outlined'
                margin='normal'
                error={!!errors.campaignName}
                helperText={errors.campaignName?.message}
              />
            )}
          />
          <Controller
            name='campaignDescription'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Description'
                type='textarea'
                multiline
                rows={8}
                inputProps={{ step: 50 }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder='The clothing advertisement campaign is aimed at promoting our new line of fashionable and trendy clothing items for the upcoming season.'
                fullWidth
                variant='outlined'
                margin='normal'
                error={!!errors.campaignDescription}
                helperText={errors.campaignDescription?.message}
              />
            )}
          />
        </div>
        <div className='w-full lg:w-1/2 bg-white rounded-[12px] shadow-lg'>
          <div className='p-6 lg:p-10'>
            <FileInput
              control={control}
              name='images'
              setImagePreviews={setImagePreviews}
              errors={errors}
            />
            <div className='mt-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-3'>
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className='relative w-full h-[150px] bg-cover bg-center rounded-[12px]'
                  style={{ backgroundImage: `url(${preview})` }}
                >
                  <IconButton
                    className='absolute top-0 right-0 m-1 text-white'
                    onClick={() => removeImage(index)}
                    style={{ color: "purple" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;
