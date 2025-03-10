"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { FloatButton } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import ChatBot from "./_components/ChatBot";
function DashboardLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-row m-0 bg-white min-h-[768px] dark:bg-slate-700">
      <Sidebar />
      {children}
      <FloatButton
        icon={<RobotOutlined fontSize="40px" />}
        onClick={showModal}
      />
      <Modal
        title=""
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ChatBot />
      </Modal>
    </div>
  );
}

export default DashboardLayout;
