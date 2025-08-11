interface NetworkInformation {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  type?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}