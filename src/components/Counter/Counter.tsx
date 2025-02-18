import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button, Box, Typography } from '@mui/material';

const Counter = () => {
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem('count');
        return saved ? JSON.parse(saved) : 0;
    });

    const backgroundAnimation = useSpring({
        height: `${Math.min(count * 2, 100)}%`,
        backgroundColor: count > 0 ? '#2196f3' : '#eeeeee',
        config: { tension: 200, friction: 30, precision: 0.1 },
    });

    useEffect(() => {
        localStorage.setItem('count', JSON.stringify(count));
    }, [count]);

    return (
        <Box
            position="relative"
            height="100vh"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
                background: 'linear-gradient(45deg, #f1f1f1, #e8e8e8)',
                padding: 2,
            }}
        >
            {/* Animated background div */}
            <animated.div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: '#2196f3',
                    ...backgroundAnimation,
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.2)',
                }}
            />
            
            {/* Display the count */}
            <Typography variant="h2" color="textPrimary" fontWeight={700} sx={{ zIndex: 1 }}>
                {count}
            </Typography>

            {/* Buttons for increment, decrement, and reset */}
            <Box
                display="flex"
                gap={3}
                mt={4}
                sx={{
                    zIndex: 1,
                    '& button': {
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 600,
                        borderRadius: '30px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                    },
                    '& button:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <Button variant="contained" color="primary" onClick={() => setCount((c: number) => c + 1)}>
                    Increment
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setCount((c: number) => c - 1)}>
                    Decrement
                </Button>
                <Button variant="outlined" color="error" onClick={() => setCount(0)}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default Counter;
