import { Box, Button, Card, Checkbox, Chip, TextField, Typography } from '@mui/material'
import Null from '../../assets/null.svg'
import DateCalenderWidget from 'components/DateCalender'
import { useState } from 'react';
import PaymentModal from 'shared/PaymentModal';
import OrderModal from 'shared/OrderConfirmedModal';
function ChooseSchedule() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const proceedToCheckout = () => {
        setIsModalOpen(true);
    }

    const handleCloseModalConfirm = () => {
        setIsModalOpenConfirm(false);
    };

    const proceedToOrderConfirmation = () => {
        setIsModalOpenConfirm(true);
    }

    return (
        <>
            <Box
                mt={2} >
                <Chip label='Choose and Schedule' sx={{ color: '#AA00CC', bgcolor: '#AA00CC30', borderRadius: '6px' }} />

                <div className='mb-20'>
                    <Box display='grid' gap='72px' gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} style={{ marginTop: '30px' }}>
                        <Box height='100%'>
                            <div
                                className='bg-white px-8 py-14 '>
                                <DateCalenderWidget />
                            </div>
                            <Typography color='#AA00CC' fontStyle='italic' sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: '8px' }}>
                                <img height={20} width={20} src={Null} alt='null' />
                                <span>Enim doloremque quisquam minus et aut veritatis</span>
                            </Typography>
                        </Box>
                        <Box>
                            <Box
                                style={{
                                    padding: '0px 19px',
                                }}>
                                <Typography fontSize='28px' mb="12px">IKEJA Div </Typography>
                                <Typography fontSize='14px' mb='36px'>
                                    Agege, Ifako-Ijaiye, Kosofe, Mushin, Alimosho, Oshodi-Isolo, Somolu, Ikeja
                                </Typography>
                                <TextField
                                    sx={{

                                        boderRadius: '4px',
                                        height: '56px',
                                        mb: '36px'
                                    }}
                                    variant='outlined'
                                    fullWidth
                                    label="Advert Type"
                                    placeholder='Video (mp4, m4v, 3gp)'
                                />
                                <TextField
                                    sx={{

                                        boderRadius: '4px',
                                        height: '56px',
                                        mb: '36px'
                                    }}
                                    variant='outlined'
                                    fullWidth
                                    label="Start Date"
                                    placeholder='Monday, 18 November 2024'
                                />
                                <TextField
                                    sx={{

                                        boderRadius: '4px',
                                        height: '56px',
                                        mb: '36px'
                                    }}
                                    variant='outlined'
                                    fullWidth
                                    label="End Date"
                                    placeholder='Friday, 28 November 2024'
                                />
                                <Box>
                                    <Typography fontSize='14px' fontWeight={600} >Booking Details </Typography>
                                    <Typography fontSize='14px' fontWeight={400} >Routes Selected: 1 </Typography>
                                    <Typography fontSize='14px' fontWeight={400} >Advert cost per day: N280,000 </Typography>
                                    <Typography fontSize='14px' fontWeight={400} >Total no of Days: 10 </Typography>
                                    <Typography fontSize='14px' fontWeight={400} >Total Amount: N280,000 </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'flex-end', gap: '50px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                        <Checkbox />
                        <p>I have read and accepted the <span style={{ color: '##AA00CC' }}> terms and conditions</span></p>
                    </div>
                    <Button
                        onClick={proceedToCheckout}
                        sx={{
                            bgcolor: '#006E88', borderRadius: '100px', width: '188px', height: '40px'
                        }}>
                        Proceed to Checkout
                    </Button>
                </div>
            </Box>
            {isModalOpen && <PaymentModal onClose={handleCloseModal} />}
            {isModalOpenConfirm && <OrderModal onClose={handleCloseModalConfirm} />}
        </>
    )

}

export default ChooseSchedule

