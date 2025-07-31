import { supabase } from '../supabaseClient';

export const trackEvent = async (businessId, eventType) => {
  try {
    // Call the database function to increment analytics
    const { error } = await supabase.rpc('increment_analytics', {
      p_business_id: businessId,
      p_metric: eventType
    });

    if (error) {
      console.error('Error tracking event:', error);
    }
  } catch (err) {
    console.error('Error in trackEvent:', err);
  }
};

export const createLead = async (businessId, leadData) => {
  try {
    const { data, error } = await supabase
      .from('business_leads')
      .insert([{
        business_id: businessId,
        ...leadData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error creating lead:', err);
    throw err;
  }
};

export const getBusinessAnalytics = async (userId, days = 30) => {
  try {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('business_analytics')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching analytics:', err);
    throw err;
  }
};