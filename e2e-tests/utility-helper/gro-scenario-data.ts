export type YesNo = 'Yes' | 'No';

export type GroScenarioData = {
  scenarioId: string;
  orderType: string;
  reason: string;
  certificateType: string;
  additionalInfo: YesNo | 'N/A';
  howPlaced: 'Online' | 'Telephone' | 'Post';
  serviceType: 'Standard' | 'Priority';
  orderDate: string;
  emailIsCorrect: YesNo;
  country: string;
  complaintDetails: string;
  enquiryDetails: string;
};

export function getGroScenarioData(scenarioId: string): GroScenarioData {
  switch (scenarioId) {
    case '1':
      return {
        scenarioId,
        orderType: 'Certificate order',
        reason: 'Order not received',
        certificateType: 'Birth',
        additionalInfo: 'Yes',
        howPlaced: 'Online',
        serviceType: 'Standard',
        orderDate: '22/04/2023',
        emailIsCorrect: 'Yes',
        country: 'Haiti',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '2':
      return {
        scenarioId,
        orderType: 'Online View Digital Image order',
        reason: 'Wrong order received',
        certificateType: 'Marriage',
        additionalInfo: 'No',
        howPlaced: 'Online',
        serviceType: 'Priority',
        orderDate: '28/02/2022',
        emailIsCorrect: 'Yes',
        country: 'Ukraine',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '3':
      return {
        scenarioId,
        orderType: 'PDF order',
        reason: 'Poor quality order',
        certificateType: 'Death',
        additionalInfo: 'Yes',
        howPlaced: 'Telephone',
        serviceType: 'Standard',
        orderDate: '15/06/2023',
        emailIsCorrect: 'No',
        country: 'United Kingdom',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '4':
      return {
        scenarioId,
        orderType: 'General Enquiry',
        reason: 'Refund query',
        certificateType: 'Adoption',
        additionalInfo: 'No',
        howPlaced: 'Post',
        serviceType: 'Priority',
        orderDate: '01/12/2023',
        emailIsCorrect: 'Yes',
        country: 'France',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '5':
      return {
        scenarioId,
        orderType: 'Certificate order',
        reason: 'Wrong order received',
        certificateType: 'Birth',
        additionalInfo: 'Yes',
        howPlaced: 'Telephone',
        serviceType: 'Priority',
        orderDate: '23/04/2023',
        emailIsCorrect: 'No',
        country: 'Zambia',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '6':
      return {
        scenarioId,
        orderType: 'Online View Digital Image order',
        reason: 'Service complaint',
        certificateType: 'Death',
        additionalInfo: 'N/A',
        howPlaced: 'Online',
        serviceType: 'Standard',
        orderDate: '05/08/2022',
        emailIsCorrect: 'Yes',
        country: 'United Kingdom',
        complaintDetails: 'Existing=Yes, Previous=No',
        enquiryDetails: 'Existing=No, Previous=No',
      };
    case '7':
      return {
        scenarioId,
        orderType: 'PDF order',
        reason: 'Order not received',
        certificateType: 'Civil partnership',
        additionalInfo: 'No',
        howPlaced: 'Telephone',
        serviceType: 'Priority',
        orderDate: '16/06/2023',
        emailIsCorrect: 'No',
        country: 'United Kingdom',
        complaintDetails: 'Existing=Yes, Previous=Yes',
        enquiryDetails: 'Existing=Yes, Previous=No',
      };
    case '8':
      return {
        scenarioId,
        orderType: 'General Enquiry',
        reason: 'Service complaint',
        certificateType: 'Adoption',
        additionalInfo: 'No',
        howPlaced: 'Post',
        serviceType: 'Standard',
        orderDate: '15/06/2023',
        emailIsCorrect: 'Yes',
        country: 'United Kingdom',
        complaintDetails: 'Existing=No, Previous=Yes',
        enquiryDetails: 'Existing=Yes, Previous=Yes',
      };
    case '9':
      return {
        scenarioId,
        orderType: 'Online View Digital Image order',
        reason: 'Service complaint',
        certificateType: 'Death',
        additionalInfo: 'No',
        howPlaced: 'Online',
        serviceType: 'Priority',
        orderDate: '15/06/2023',
        emailIsCorrect: 'No',
        country: 'Haiti',
        complaintDetails: 'Existing=No, Previous=No',
        enquiryDetails: 'Existing=No, Previous=Yes',
      };
    case '10':
      return {
        scenarioId,
        orderType: 'General Enquiry',
        reason: 'Poor quality order',
        certificateType: 'Adoption',
        additionalInfo: 'No',
        howPlaced: 'Post',
        serviceType: 'Priority',
        orderDate: '01/01/2023',
        emailIsCorrect: 'Yes',
        country: 'France',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '11':
      return {
        scenarioId,
        orderType: 'Certificate order',
        reason: 'Other issues and feedback',
        certificateType: 'Marriage',
        additionalInfo: 'N/A',
        howPlaced: 'Online',
        serviceType: 'Standard',
        orderDate: '22/10/2021',
        emailIsCorrect: 'No',
        country: 'United Kingdom',
        complaintDetails: 'Existing=Yes, Previous=Yes',
        enquiryDetails: 'Existing=Yes, Previous=No',
      };
    case '12':
      return {
        scenarioId,
        orderType: 'PDF order',
        reason: 'Other issues and feedback',
        certificateType: 'Civil partnership',
        additionalInfo: 'N/A',
        howPlaced: 'Telephone',
        serviceType: 'Priority',
        orderDate: '02/01/2023',
        emailIsCorrect: 'Yes',
        country: 'Cuba',
        complaintDetails: 'Existing=Yes, Previous=No',
        enquiryDetails: 'Existing=No, Previous=Yes',
      };
    case '13':
      return {
        scenarioId,
        orderType: 'Certificate order',
        reason: 'Poor quality order',
        certificateType: 'Birth',
        additionalInfo: 'Yes',
        howPlaced: 'Online',
        serviceType: 'Standard',
        orderDate: '22/04/2023',
        emailIsCorrect: 'Yes',
        country: 'Haiti',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '14':
      return {
        scenarioId,
        orderType: 'Online View Digital Image order',
        reason: 'Wrong order received',
        certificateType: 'Marriage',
        additionalInfo: 'No',
        howPlaced: 'Online',
        serviceType: 'Priority',
        orderDate: '28/02/2022',
        emailIsCorrect: 'Yes',
        country: 'Ukraine',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '15':
      return {
        scenarioId,
        orderType: 'PDF order',
        reason: 'Service complaint',
        certificateType: 'Civil partnership',
        additionalInfo: 'No',
        howPlaced: 'Telephone',
        serviceType: 'Standard',
        orderDate: '15/06/2023',
        emailIsCorrect: 'No',
        country: 'Haiti',
        complaintDetails: 'Existing=No, Previous=No',
        enquiryDetails: 'Existing=No, Previous=Yes',
      };
    case '16':
      return {
        scenarioId,
        orderType: 'General Enquiry',
        reason: 'Poor quality order',
        certificateType: 'Adoption',
        additionalInfo: 'No',
        howPlaced: 'Post',
        serviceType: 'Priority',
        orderDate: '01/01/2023',
        emailIsCorrect: 'Yes',
        country: 'France',
        complaintDetails: 'N/A',
        enquiryDetails: 'N/A',
      };
    case '17':
      return {
        scenarioId,
        orderType: 'Certificate order',
        reason: 'Service complaint',
        certificateType: 'Marriage',
        additionalInfo: 'N/A',
        howPlaced: 'Online',
        serviceType: 'Standard',
        orderDate: '22/10/2021',
        emailIsCorrect: 'No',
        country: 'United Kingdom',
        complaintDetails: 'Existing=No, Previous=Yes',
        enquiryDetails: 'Existing=Yes, Previous=No',
      };
    default:
      throw new Error(`Invalid GRO scenario id: ${scenarioId}`);
  }
}
