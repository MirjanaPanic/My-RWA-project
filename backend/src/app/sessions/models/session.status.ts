export enum SessionStatus {
  IN_PROGRESS,
  BREAK,
  PAUSED_WORK, //pauzirao rad
  PAUSED_BREAK, //pauzirao pauzu
  DONE, //finish - kad je cela zavrsena :)
  EARLY_DONE,
  CANCEL,
}
//u toku, pauza, zavrsenaCela, otkazana, zavrsenaRanije
