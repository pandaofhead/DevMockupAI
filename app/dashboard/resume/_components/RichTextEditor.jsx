// "use client";
// import { Button } from "@/components/ui/button";
// import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// import { Bot, LoaderCircle } from "lucide-react";
// import React, { useContext, useState, useEffect } from "react";
// import { chatSession } from "@/utils/GeminiAIModal";
// import {
//   BtnBold,
//   BtnBulletList,
//   BtnClearFormatting,
//   BtnItalic,
//   BtnLink,
//   BtnNumberedList,
//   BtnStrikeThrough,
//   BtnStyles,
//   BtnUnderline,
//   Editor,
//   EditorProvider,
//   HtmlButton,
//   Separator,
//   Toolbar,
// } from "react-simple-wysiwyg";
// import { toast } from "sonner";
// const PROMPT =
//   "Given experience: {workSummary}, title: {positionTitle} and Job Description: {jobDesc}, revise resume workSummary in 3-4 bullet points to better fit the Job Description (Please do not include word Summary and No JSON array) , give me result in HTML tags";
// function RichTextEditor({
//   onRichTextEditorChange,
//   defaultValue,
//   index,
//   jobDesc,
// }) {
//   const [value, setValue] = useState(defaultValue);
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const [loading, setLoading] = useState(false);

//   const GenerateSummaryFromAI = async () => {
//     if (!resumeInfo?.experience[index]?.title) {
//       toast("Please Add Position Title or Work Summary", "error");
//       return;
//     }
//     setLoading(true);
//     const prompt = PROMPT.replace("{workSummary}", value)
//       .replace("{positionTitle}", resumeInfo.experience[index].title)
//       .replace("{jobDesc}", jobDesc);

//     const result = await chatSession.sendMessage(prompt);
//     const resp = result.response.text();
//     setValue(resp.replace("[", "").replace("]", ""));
//     setLoading(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between my-2 items-center">
//         <label className="text-xs">Summary</label>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={GenerateSummaryFromAI}
//           disabled={loading}
//           className="flex gap-2 border-primary text-primary"
//         >
//           {loading ? (
//             <LoaderCircle className="animate-spin" />
//           ) : (
//             <>
//               <Bot className="h-6 w-6" />
//               Generate Summery
//             </>
//           )}
//         </Button>
//       </div>
//       <EditorProvider>
//         <Editor
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//             onRichTextEditorChange(e);
//           }}
//         >
//           <Toolbar>
//             <BtnBold />
//             <BtnItalic />
//             <BtnUnderline />
//             <BtnStrikeThrough />
//             <Separator />
//             <BtnNumberedList />
//             <BtnBulletList />
//             <Separator />
//             <BtnLink />
//           </Toolbar>
//         </Editor>
//       </EditorProvider>
//     </div>
//   );
// }

// export default RichTextEditor;
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
// import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    const GenerateSummeryFromAI=async()=>{
     
      if(!resumeInfo?.Experience[index]?.title)
      {
        toast('Please Add Position Title');
        return ;
      }
      setLoading(true)
      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.Experience[index].title);
      
      const result=await AIChatSession.sendMessage(prompt);
      console.log(result.response.text());
      const resp=result.response.text()
      setValue(resp.replace('[','').replace(']',''));
      setLoading(false);
    }
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor