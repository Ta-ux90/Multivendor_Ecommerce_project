import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions, 
    Button, 
    Snackbar, 
    Alert 

} from '@mui/material';
import { getProducts, addToCart } from '../services/api';

// ----------------------------------------------------------

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts(category);
                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId);
            setSnackbarMessage('Product added to cart!');
            setSnackbarSeverity('success');
        } catch (err) {
            console.error('Failed to add product to cart');
            setSnackbarMessage('Failed to add product to cart.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 5, mt: 1, textAlign: 'center', color: '#2a386e' }}>
                {category}
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imageUrl}
                                alt={product.title}
                                sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: '600', color: '#333' }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: '500' }}>
                                   {product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={() => handleAddToCart(product._id)}
                                    sx={{
                                        borderRadius: 1,
                                        '&:hover': { backgroundColor: '#d32f2f' },
                                        padding: '10px 20px'
                                    }}
                                >
                                    Add To Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CategoryPage;
