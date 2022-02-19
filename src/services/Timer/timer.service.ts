export class Timer {
  
  /**
   * tick
   */
  public tick(seconds:number, minutes:number, changeSecond:any, changeMinute:any) {
    const declaredTimerConstants = {
      MINIMUM_SECOND_COUNT: 0,
      RENEWED_MINUTES: 59,
    }
    const { MINIMUM_SECOND_COUNT, RENEWED_MINUTES } = declaredTimerConstants;

    setTimeout(() => {
      if (seconds <= MINIMUM_SECOND_COUNT) {
        changeSecond(RENEWED_MINUTES);
        changeMinute(minutes - 1);  
      } else if (seconds > MINIMUM_SECOND_COUNT) {
        changeSecond(seconds - 1);
      }
   }, 1000);

  }
}