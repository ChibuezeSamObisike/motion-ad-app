/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import emptyAsset from "assets/empty-asset.svg"; // Ensure the correct path to your asset

interface TableColumn {
  label: string;
  key: string;
}

interface TableRow {
  [key: string]: any;
}

interface AppTableProps {
  title?: string;
  header: TableColumn[];
  data: TableRow[];
}

const AppTable: FC<AppTableProps> = ({ title, header, data }) => {
  // Check if the data array is empty
  const isEmpty = data.length === 0;

  return (
    <div className='p-0 md:p-5 rounded-[20px] w-full'>
      {title && <h4 className='text-lg font-semibold'>{title}</h4>}

      <div
        className='mt-5 w-full'
        style={{
          borderRadius: "10px",
          border: "1px solid #0000000D",
          overflow: "hidden",
        }}
      >
        {isEmpty ? (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            px={4}
            py={6}
            width='100%'
            height='100%'
            border='1px solid #D8D8D8'
            borderRadius='10px'
            textAlign='center'
          >
            <img src={emptyAsset} alt='No data available' className='mb-4' />
            <Typography fontSize='14px' color='textSecondary'>
              Analytics are yet to start
            </Typography>
          </Box>
        ) : (
          // Render table when data is available
          <table style={{ width: "100%" }}>
            <thead>
              <tr className='bg-gray-200 p-2'>
                {header.map(({ label, key }) => (
                  <th
                    key={key}
                    className='p-3 text-[14px] font-medium'
                    align='left'
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index} style={{ borderTop: "1px solid #0000000D" }}>
                  {header.map(({ key }) => (
                    <td key={key} className='p-3 text-[12px]'>
                      {key === "status" ? (
                        <div
                          style={{
                            border: `1px solid ${
                              row[key] === "completed" ? "#3CB961" : "#F6D11A"
                            }`,
                            backgroundColor:
                              row[key] === "completed"
                                ? "rgba(60, 185, 97, 0.1)"
                                : "rgba(246, 209, 26, 0.1)",
                            padding: "5px",
                            display: "inline-block",
                            width: "80px",
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                          className='rounded-full text-center'
                        >
                          {row[key]}
                        </div>
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppTable;
