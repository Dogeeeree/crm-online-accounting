import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Response interceptor to extract data easily
api.interceptors.response.use((response) => {
    return response.data; // Assumes ApiResponse format from Spring Boot
}, (error) => {
    return Promise.reject(error);
});

export const fetchCustomers = () => api.get('/customers');
export const createCustomer = (data) => api.post('/customers', data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export const fetchContracts = () => api.get('/contracts');
export const createContract = (customerId, data) => api.post(`/contracts/${customerId}`, data);

export const fetchInvoices = () => api.get('/invoices');
export const createInvoice = (data) => api.post('/invoices', data);

export const fetchReceipts = () => api.get('/receipts-payments');
export const createReceipt = (data) => api.post('/receipts-payments', data);

export const fetchInventory = () => api.get('/inventory-cards');
export const createInventory = (data) => api.post('/inventory-cards', data);

export const fetchProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);

export default api;
