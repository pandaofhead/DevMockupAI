import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <h2 className="font-semibold text-xl text-center mb-1">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      <div className="flex justify-center">
        <h3 className="text-center text-xs ">
          {resumeInfo?.address} | {resumeInfo?.phone} | {resumeInfo?.email}
        </h3>
      </div>
      <hr
        className="my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
