import React, { createContext, useContext, useState, useEffect, startTransition } from 'react';
import { businessService } from '../src/services/businessService'; // Make sure this path matches your project structure

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load business data when component mounts
  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await businessService.getUserBusiness();
      
      if (data) {
        // Transform Supabase data back to your format
        const transformedData = {
          businessName: data.business_name,
          email: data.email,
          contact: data.contact,
          social: {
            facebook: data.facebook,
            twitter: data.twitter,
            instagram: data.instagram,
            linkedin: data.linkedin,
          },
          physicalAddress: data.physical_address,
          region: data.region,
          district: data.district,
          town: data.town,
          operatingHours: data.operating_hours,
          employeeCount: data.employee_count,
        };
        
        startTransition(() => {
          setBusinessData(transformedData);
        });
      }
    } catch (err) {
      console.error('Error loading business data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessInfo = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if business already exists
      const existingBusiness = await businessService.getUserBusiness();
      
      let result;
      if (existingBusiness) {
        // Update existing business
        result = await businessService.updateBusiness(data);
      } else {
        // Create new business
        result = await businessService.saveBusiness(data);
      }
      
      // Update local state immediately
      startTransition(() => {
        setBusinessData(data);
      });
      
      return result;
    } catch (err) {
      console.error('Error saving business data:', err);
      setError(err.message);
      throw err; // Re-throw so the form can handle the error
    } finally {
      setLoading(false);
    }
  };

  const refreshBusinessData = () => {
    loadBusinessData();
  };

  const clearBusinessData = () => {
    setBusinessData(null);
    setError(null);
  };

  const value = {
    businessData,
    saveBusinessInfo,
    loading,
    error,
    refreshBusinessData,
    clearBusinessData,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};