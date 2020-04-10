import { Callback } from "common-types";
import { ChangeEvent } from "react";

const handleUploadData = (getHandledDataFn?: Callback) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();

    if(e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      reader.readAsText(e.target.files[0]);
    }

    reader.addEventListener('load', (e) => {
      if(e.target && e.target.result && typeof e.target.result === 'string') {
        const handledRes = JSON.parse(e.target.result);
        console.log(handledRes);
        getHandledDataFn && getHandledDataFn(handledRes);
      }
    });
  };

};

export default handleUploadData;