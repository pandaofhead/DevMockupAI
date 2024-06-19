"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover: shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg">+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Interview Requirements</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <Textarea className="my-3" />
              <Textarea className="my-3" />
              <div className="flex gap-5 justify-end my-3">
                <Button
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
                  onClick={() => setOpenDialog(false)}
                >
                  Start Interview
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
