// services/visitNotesApiForLive.ts

// 🔧 API Configuration - Developer শুধু এই URL পরিবর্তন করবে
const API_BASE_URL = 'http://localhost:5096/api';

// 🎭 Mock Mode - true হলে রিয়েল API কল না করে Mock ডেটা দেখাবে
const USE_MOCK_MODE = true; // Developer চাইলে false করে দিবে

export interface VisitNotesSyncResponse {
  success: boolean;
  message: string;
  syncedId?: number;
  data?: any;
}

// 📤 Payload Builder Function
const buildVisitNotesPayload = (safeData: any) => {
  return {
    id: safeData.id || 0,
    date: safeData.date || new Date().toISOString().split('T')[0],
    visitTime: safeData.visitTime || new Date().toISOString(),
    
    childConcernsArray: safeData.childConcernsArray || [],
    noteContactTypeLookupId: safeData.noteContactTypeLookupId || 2,
    faceToFaceWithChild: safeData.faceToFaceWithChild || false,
    
    babyToddlerPrograms: safeData.babyProgramsGrowth || safeData.babyToddlerPrograms || '',
    schoolActivities: safeData.schoolActivities || '',
    independentLivingSkills: safeData.independentLivingSkills || '',
    purchasesForChild: safeData.purchasesForChild || '',
    familyVisits: safeData.familyVisitsSummary || safeData.familyVisits || '',
    childIssues: safeData.childIssuesBehaviors || safeData.childIssues || '',
    
    fireExtinguisher: safeData.safetyFireExtinguisher || safeData.fireExtinguisher || false,
    smokeDetectors: safeData.safetySmokeDetectors || safeData.smokeDetectors || false,
    carbonDetector: safeData.safetyCarbonDetector || safeData.carbonDetector || false,
    emergencyNumbers: safeData.safetyEmergencyNumbers || safeData.emergencyNumbers || false,
    firstAidKit: safeData.safetyFirstAidKit || safeData.firstAidKit || false,
    twoFormsOfExit: safeData.safetyTwoFormsOfExit || safeData.twoFormsOfExit || false,
    runningHeatedWater: safeData.safetyRunningHeatedWater || safeData.runningHeatedWater || false,
    willingToBeRespiteHome: safeData.safetyWillingRespiteHome || safeData.willingToBeRespiteHome || false,
    
    childrenSleepingArrangement: safeData.childrenSleepLocation || safeData.childrenSleepingArrangement || '',
    medicationsStorage: safeData.medicationsStorage || '',
    cleanersStorage: safeData.cleanersStorage || '',
    updatedPhoneNumberAndEmail: safeData.contactInfoUpToDate || safeData.updatedPhoneNumberAndEmail || '',
    additionalComments: safeData.additionalComments || '',
    fosterCareAssistantSignature: safeData.fosterCareAssistantSignature || '',
    
    isCompleted: safeData.isCompleted || false,
    
    recordedBy: safeData.recordedBy || 'Kona_Supervisor',
    recordedOn: safeData.recordedOn || new Date().toISOString(),
    createdBy: safeData.createdBy || 'Kona_Supervisor',
    createdOn: safeData.createdOn || new Date().toISOString(),
    
    familyName: safeData.familyName || '',
    childrenFirstName: safeData.childrenFirstName || '',
    childrenLastName: safeData.childrenLastName || ''
  };
};

// 🎭 Mock Sync Function
const mockSyncVisitNotes = async (familyName: string, childrenFirstName: string, childrenLastName: string, noteData: any): Promise<VisitNotesSyncResponse> => {
  console.log('🎭 ===== MOCK VISIT NOTES SYNC STARTED =====');
  console.log('📌 Family Name:', familyName);
  console.log('📌 Children First Name:', childrenFirstName);
  console.log('📌 Children Last Name:', childrenLastName);
  console.log('📦 Note Data:', noteData);
  
  const payload = buildVisitNotesPayload(noteData);
  
  console.log('📤 ===== COMPLETE VISIT NOTES PAYLOAD =====');
  console.log(JSON.stringify(payload, null, 2));
  console.log('📤 ===== PAYLOAD END =====');
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    message: '✅ Visit Notes synced successfully (MOCK MODE)',
    syncedId: Math.floor(Math.random() * 10000),
    data: {
      ...payload,
      syncedAt: new Date().toISOString(),
      mockMode: true
    }
  };
};

// 🌐 Real API Health Check
export const checkVisitNotesAPIHealth = async (): Promise<boolean> => {
  if (USE_MOCK_MODE) {
    console.log('🎭 MOCK: API Health Check - Always Online');
    return true;
  }
  
  try {
    console.log(`🔍 Checking API health at: ${API_BASE_URL}/sync`);
    const response = await fetch(`${API_BASE_URL}/sync`, {
      method: 'HEAD',
      cache: 'no-cache',
    });
    console.log(`✅ API health check response: ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error('❌ API health check failed:', error);
    return false;
  }
};

// 📤 Main Sync Function - URL: /sync/familyName/childrenFirstName/childrenLastName
export const syncVisitNotes = async (familyName: string, childrenFirstName: string, childrenLastName: string, noteData: any): Promise<VisitNotesSyncResponse> => {
  if (USE_MOCK_MODE) {
    return await mockSyncVisitNotes(familyName, childrenFirstName, childrenLastName, noteData);
  }
  
  try {
    const safeData = noteData || {};
    const encodedFamilyName = encodeURIComponent(familyName || 'UNKNOWN');
    const encodedChildrenFirstName = encodeURIComponent(childrenFirstName || 'UNKNOWN');
    const encodedChildrenLastName = encodeURIComponent(childrenLastName || 'UNKNOWN');
    
    // 🔥 URL: http://localhost:5096/api/sync/familyName/childrenFirstName/childrenLastName
    const url = `${API_BASE_URL}/sync/${encodedFamilyName}/${encodedChildrenFirstName}/${encodedChildrenLastName}`;
    
    console.log('🔄 Syncing visit notes...');
    console.log('📌 Family Name:', familyName);
    console.log('📌 Children First Name:', childrenFirstName);
    console.log('📌 Children Last Name:', childrenLastName);
    console.log('📡 API URL:', url);
    
    const payload = buildVisitNotesPayload(safeData);
    
    console.log('📤 Final Visit Notes Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('📡 Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Sync Response:', result);
    
    return {
      success: true,
      message: result.message || 'Visit Notes synced successfully',
      syncedId: result.id || result.syncedId,
      data: result
    };
    
  } catch (error: any) {
    console.error('❌ Sync error:', error);
    return {
      success: false,
      message: error.message || 'Network error',
    };
  }
};

// 📤 Bulk Sync Function
export const syncMultipleVisitNotes = async (notes: any[]): Promise<{
  success: boolean;
  results: Array<{ index: number; success: boolean; error?: string }>;
  totalSynced: number;
}> => {
  try {
    const results = [];
    let successCount = 0;

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const familyName = note.familyName || '';
      const childrenFirstName = note.childrenFirstName || '';
      const childrenLastName = note.childrenLastName || '';
      
      const result = await syncVisitNotes(familyName, childrenFirstName, childrenLastName, note);
      
      results.push({
        index: i,
        success: result.success,
        error: result.success ? undefined : result.message
      });
      
      if (result.success) successCount++;
    }

    console.log(`📊 Bulk Sync Complete: ${successCount}/${notes.length} synced`);
    
    return {
      success: successCount === notes.length,
      results: results,
      totalSynced: successCount
    };
  } catch (error: any) {
    console.error('❌ Bulk sync error:', error);
    return {
      success: false,
      results: [],
      totalSynced: 0
    };
  }
};

// 📌 Export configuration info
export const getVisitNotesConfig = () => ({
  apiBaseUrl: API_BASE_URL,
  mockMode: USE_MOCK_MODE,
});