import React from 'react';

export default function ConfirmEmail() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-[35px] font-bold text-zinc-800">Check your inbox</h2>
        <p className="mb-2 text-lg text-zinc-500">We are glad that you're with us! We've sent you a verification link to the email address.</p>
        <a href="mailto:" className="mt-3 inline-block w-96 rounded bg-[#F53838] px-5 py-3 font-medium text-white shadow-md shadow-[#fff] hover:bg-[#F53838]"  style={{ color: 'white' }}>Open the Email App →</a>
      </div>
    </div>
  );
}
