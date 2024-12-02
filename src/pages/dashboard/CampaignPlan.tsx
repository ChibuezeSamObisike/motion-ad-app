import { Box, Button, Card, Chip, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import LocationImage from '../../assets/location.svg'
import { useNavigate } from 'react-router-dom'
export default function CampaignPlan() {
    const navigate = useNavigate()

    const cards = [
        {
            id: 1,
            location: 'IKEJA Div',
            description: 'Agege, Ifako-Ijaiye, Kosofe, Mushin, Alimosho, Oshodi-Isolo, Somolu, Ikeja',
        },
        {
            id: 11,
            location: 'LAGOS [EKO] Div',
            description: 'Lagos Island, Lagos Mainland, Surulere, Apapa, Eti-Osa',
        },
        {
            id: 12,
            location: 'LAGOS [EKO] Div',
            description: 'Agege, Ifako-Ijaiye, Kosofe, Mushin, Alimosho, Oshodi-Isolo, Somolu, Ikeja',
        },
        {
            id: 13,
            location: 'IKEJA Div',
            description: 'Lagos Island, Lagos Mainland, Surulere, Apapa, Eti-Osa',
        },
    ]

    const goToSchedule = () => {
        navigate('/campaigns/schedule')
    }

    const [selected, setSelected] = useState<any>()
    const [selectedFilter, setSelectedFilter] = useState<string>("lag");


    const handleSelect = (index: any) => {
        setSelected(index)
    }
    return (
        <Box
            mt={2} >

            <div className='mb-20'>
                <Chip label='Choose a plan' sx={{ color: '#AA00CC', bgcolor: '#AA00CC30', borderRadius: '6px' }} />
                <Typography fontSize='28px' my="12px">Get Started Now, Pick a  Route!</Typography>
                <Typography fontSize='14px'>
                    Pick a Motion365 ad route that suits your business needs and get
                    unrestricted access to all the features
                </Typography>
                <div style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', gap: 30, marginBottom: '24px', alignItems: 'center' }}>
                        <Typography>
                            Preferred Campaign Location
                        </Typography>
                        <Select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value as string)}
                            displayEmpty
                            variant='standard'
                            disableUnderline

                            sx={{
                                height: "42px",
                                width: { xs: "100%", md: "150px" },
                                background: "white",
                                borderRadius: "12px",
                                border: '1px solid #79747E'
                            }}
                            className='px-3'
                        >
                            <MenuItem value='abj'>Abuja</MenuItem>
                            <MenuItem value='lag'>Lagos</MenuItem>
                            <MenuItem value='by'>Bayelsa</MenuItem>
                            <MenuItem value='cr'>Cross River</MenuItem>

                        </Select>
                    </div>
                    <Box display='grid' gap='40px'
                        gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
                        {cards.map(({ location, description, id }) => {
                            return (
                                <Card
                                    onClick={() => setSelected(id)}
                                    key={id} style={{
                                        borderRadius: '14px', border: selected === id ? '2px solid #AA00CC' : '0px',
                                        padding: '25px 19px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                    <img src={LocationImage} alt="Location Image" height={76} width={55} />
                                    <Typography style={{ color: '#AA00CC', fontSize: '16px', fontWeight: 600 }} my='12px'>{location}</Typography>
                                    <Typography textAlign='center' fontSize='13px' fontWeight={400} height={60}>{description}</Typography>
                                    <Box
                                        bgcolor='#AA00CC'
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                        width='35px' height='1px'
                                        my='12px'
                                    />
                                    <Typography fontSize='13px' fontWeight={400} >Est viewers: 120,1200 </Typography>
                                </Card>
                            )
                        })}
                    </Box>
                </div>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center', justifyContent: 'flex-end'
            }}>
                <Button
                    onClick={goToSchedule}
                    sx={{
                        bgcolor: '#006E88', borderRadius: '100px', width: '140px', height: '40px'
                    }}>
                    Continue
                </Button>
            </div>
        </Box>
    )
}
