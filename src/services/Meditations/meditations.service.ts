import { collection, Firestore } from "@firebase/firestore";
import { getDocs } from "firebase/firestore";
import { IChartData, IUserMeditations } from "./meditations.interface";

export class Meditations {

  /**
   * Get meditations list in chart data type. 
   * 
   * @param userEmail Is the email, that we take from localStorage
   * @param database Is the firestore database
   * @param setDataToState is an useState set function
   **/
  public getMeditations = async (userEmail: string, database: Firestore, setDataToState: (value: React.SetStateAction<IChartData>) => void) => {
    
    const meditationListCollectionRef = collection(database, userEmail, 'Total_data', 'meditations');
    const unsortedData = await getDocs(meditationListCollectionRef);
    const userMeditations: IUserMeditations[] = unsortedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    setDataToState({
      labels: this._formatDate(userMeditations),
      datasets: [{
        data: [...userMeditations.map((data: any) => data.minutes)],
        label: 'minutes',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }]
    });
  }

  private _formatDate = (userMeditations: IUserMeditations[]): string[] => {
    const dates: Date[] = userMeditations.map((data: any) => new Date(data.createdAt?.seconds * 1000));
    
    const formatDate: string[] = dates.map((date: any) => {
      const unformatDate = new Date(date);
      const month = unformatDate.getUTCMonth() + 1;
      const day = unformatDate.getUTCDate();
      const year = unformatDate.getUTCFullYear();

      return `${day}/${month}/${year}`;
    });

    return [...formatDate];
  };
  
}