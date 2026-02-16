import clinicData from "@/content/clinic.json";
import therapistData from "@/content/therapist.json";

export interface ClinicLocation {
  addressLine1: string;
  postalCode: string;
  city: string;
  municipality: string;
  country: string;
}

export interface ClinicContact {
  phoneDisplay: string;
  phoneE164: string;
  email?: string;
}

export interface ClinicMap {
  googleMapsQuery: string;
}

export interface ClinicService {
  name: string;
  description: string;
}

export interface ClinicAgreement {
  name: string;
  description: string;
}

export interface Clinic {
  name: string;
  alternateName: string;
  type: string;
  location: ClinicLocation;
  contact: ClinicContact;
  map: ClinicMap;
  summary: string;
  heroShortIntro?: string;
  whatToExpect?: string[];
  therapistsPageIntro?: string;
  services: ClinicService[];
  agreements?: ClinicAgreement[];
  openingHours?: string;
  adkomst?: string[];
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  agreement: string;
  education: string[];
  summary?: string;
  professionalProfile: string;
  focusAreas: string[];
  image: string;
  imagePosition?: string;
  bookingUrl?: string;
  specialization?: string[];
  methods?: string[];
  experience?: string[];
  additionalRoles?: string[];
}

const therapistImageMap: Record<string, string> = {
  "magnus-richardsen": "/content/image/terapeut_magnus.png",
  "marcus-smavik-dasa": "/content/image/terapeut_marcus_v2.png",
  "eirik-berge": "/content/image/Cropped_eirik.png",
  "kjartan-vibe-fersum": "/content/image/terapeut_kjartan_v3.png",
  "anine-vibe-simonsen": "/content/image/terapeut_anine.png",
};

const therapistImagePosition: Record<string, string> = {
  "magnus-richardsen": "center 35%",
  "marcus-smavik-dasa": "center 30%",
  "eirik-berge": "center",
  "kjartan-vibe-fersum": "center 25%",
  "anine-vibe-simonsen": "center 40%",
};

export function getClinic(): Clinic {
  return clinicData as Clinic;
}

export function getTherapists(): Therapist[] {
  const therapists = (therapistData as { therapists: Therapist[] }).therapists;
  return therapists.map((t) => ({
    ...t,
    image: therapistImageMap[t.id] ?? t.image,
    imagePosition: therapistImagePosition[t.id] ?? "center 35%",
  }));
}

export function getTherapistById(id: string): Therapist | undefined {
  return getTherapists().find((t) => t.id === id);
}
