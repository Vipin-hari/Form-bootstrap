"use client";
import dynamic from 'next/dynamic';
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from 'react-hot-toast';

const LineChartPage = dynamic(() => import("@/components/charts/charts"), { 
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">  
      <Toaster />
      <Navbar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center" >
        <LineChartPage />
      </div>
    </div>
  );
}
