import { supabase } from '../supabaseClient';

export const updateSubscription = async (userId, planData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        subscription_plan: planData.plan,
        subscription_status: planData.status || 'active',
        subscription_start_date: planData.startDate || new Date().toISOString(),
        subscription_end_date: planData.endDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // Update business features based on plan
    await updateBusinessFeatures(userId, planData.plan);
    
    return data;
  } catch (err) {
    console.error('Error updating subscription:', err);
    throw err;
  }
};

export const updateBusinessFeatures = async (userId, plan) => {
  try {
    const features = {
      is_featured: ['basic', 'standard', 'pro'].includes(plan),
      homepage_featured: ['standard', 'pro'].includes(plan),
      banner_placement: plan === 'pro',
      featured_until: plan !== 'free' ? 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : 
        null
    };

    const { error } = await supabase
      .from('businesses')
      .update(features)
      .eq('user_id', userId);

    if (error) throw error;
  } catch (err) {
    console.error('Error updating business features:', err);
    throw err;
  }
};

export const checkSubscriptionStatus = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_plan, subscription_status, subscription_end_date')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Check if subscription is expired
    if (data.subscription_end_date && new Date(data.subscription_end_date) < new Date()) {
      await updateSubscription(userId, {
        plan: 'free',
        status: 'expired'
      });
      return { ...data, subscription_plan: 'free', subscription_status: 'expired' };
    }

    return data;
  } catch (err) {
    console.error('Error checking subscription status:', err);
    throw err;
  }
};