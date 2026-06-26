export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  github: string;
  /** Le PDF doit être placé dans /public à ce chemin. */
  cvPath: string;
};

export const contact: ContactInfo = {
  email: "lucval1701@gmail.com",
  phone: "+33 7 69 25 15 76",
  location: "Strasbourg / Illkirch-Graffenstaden",
  github: "https://github.com/valletLuca",
  cvPath: "/cv-luca-vallet.pdf",
};
