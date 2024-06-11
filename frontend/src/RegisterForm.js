import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        account_type: 'private',  // По умолчанию выбираем тип private
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', formData);
            console.log('Registration successful:', response.data);
            // Дополнительная логика после успешной регистрации (например, перенаправление пользователя)
        } catch (error) {
            console.error('Registration failed:', error);
            // Обработка ошибок регистрации
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />

            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <label>
                Account type:
                <select name="account_type" value={formData.account_type} onChange={handleChange}>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                </select>
            </label>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;