'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import css from './SignUp.module.css';
import { register } from '@/lib/api/clientApi';
import type { RegisterRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { Routes } from '@/app/config/routes';

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState('');

  const handleRegister = async (formData: FormData) => {
    setError('');

    try {
      const formValues = Object.fromEntries(
        formData.entries()
      ) as RegisterRequest;

      const user = await register(formValues);

      if (!user) {
        setError('Invalid email or password. Please try again.');
        return;
      }

      setUser(user);
      toast.success('You have successfully registered!');
      router.push(Routes.Profile);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('Internal Server Error');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} action={handleRegister}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
