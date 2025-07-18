import { supabase } from '../supabaseClient'; // Adjust path to your supabase client

export const businessService = {
  // Save business data
  async saveBusiness(businessData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const businessRecord = {
        user_id: user.id,
        business_name: businessData.businessName,
        email: businessData.email,
        contact: businessData.contact,
        industry: businessData.industry,
        business_description: businessData.businessDescription,
        business_services: businessData.servicesProducts,
        facebook: businessData.social?.facebook || null,
        twitter: businessData.social?.twitter || null,
        instagram: businessData.social?.instagram || null,
        linkedin: businessData.social?.linkedin || null,
        physical_address: businessData.physicalAddress,
        region: businessData.region,
        district: businessData.district,
        town: businessData.town,
        operating_hours: businessData.operatingHours,
        employee_count: businessData.employeeCount,
      };

      const { data, error } = await supabase
        .from('businesses')
        .insert([businessRecord])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving business:', error);
      throw error;
    }
  },

  // Get user's business data
  async getUserBusiness() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching business:', error);
      throw error;
    }
  },

  // Update business data
  async updateBusiness(businessData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const businessRecord = {
        business_name: businessData.businessName,
        email: businessData.email,
        contact: businessData.contact,
        facebook: businessData.social?.facebook || null,
        twitter: businessData.social?.twitter || null,
        instagram: businessData.social?.instagram || null,
        linkedin: businessData.social?.linkedin || null,
        physical_address: businessData.physicalAddress,
        region: businessData.region,
        district: businessData.district,
        town: businessData.town,
        operating_hours: businessData.operatingHours,
        employee_count: businessData.employeeCount,
      };

      const { data, error } = await supabase
        .from('businesses')
        .update(businessRecord)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating business:', error);
      throw error;
    }
  }
};