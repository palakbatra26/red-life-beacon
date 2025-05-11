
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { allCamps } from '@/data/camps';
import CampDetailsCard from '@/components/donation/CampDetailsCard';
import DonorInfoForm from '@/components/donation/DonorInfoForm';
import CampNotFound from '@/components/donation/CampNotFound';

const DonationFormPage = () => {
  const { campId } = useParams<{campId: string}>();
  
  // Find the camp details
  const campDetails = allCamps.find(camp => camp.id.toString() === campId);

  if (!campDetails) {
    return (
      <Layout>
        <CampNotFound />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Schedule Your Donation</h1>
            <p className="mt-2 text-gray-600">
              Complete this form to schedule your donation at {campDetails.title}
            </p>
          </div>

          {/* Camp details card */}
          <CampDetailsCard campDetails={campDetails} />

          {/* Donation form */}
          <DonorInfoForm campDetails={campDetails} />
        </div>
      </div>
    </Layout>
  );
};

export default DonationFormPage;
