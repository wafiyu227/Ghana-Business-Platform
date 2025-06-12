import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://efwsfgbnjbfsvcxmiepm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmd3NmZ2JuamJmc3ZjeG1pZXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTYwNDUsImV4cCI6MjA2NTMzMjA0NX0.PtDtfNBU5ehzvnPcMktd-yFRWD_3HoUwrTToRl2vfMc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
