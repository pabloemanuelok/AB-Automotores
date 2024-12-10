import React from 'react';
import Login from '@/Components/Login/Login';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>Login - AB Automotores</title>
        <meta name="description" content="Inicia sesión para acceder a tu cuenta de AB Automotores" />
      </Head>
      <Login />
    </div>
  );
}

export default LoginPage;
