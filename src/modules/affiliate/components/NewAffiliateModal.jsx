import Transition from "@/core/utils/Transition.jsx";
import React, {  useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Cancel01Icon,
  DeliveryBox01Icon,
  InformationCircleIcon,
  Upload04Icon,
  UserIdVerificationIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "hugeicons-react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Switch } from "@nextui-org/switch";

const NavOptions = [
  {
    key: 1,
    label: "Informations",
    notify: 0,
    icon: InformationCircleIcon,
  },
  {
    key: 2,
    label: "Permissions",
    notify: 0,
    icon: UserIdVerificationIcon,
  },
  {
    key: 3,
    label: "Affiliate",
    notify: 0,
    icon: DeliveryBox01Icon,
  },
];

function NewAffiliateModal({ id, modalOpen, setModalOpen }) {
  const modalContent = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [selectedNavOption, setSelectedNavOption] = useState(1);
  const handleButtonClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      closeModal(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const closeModal = (v) => {
    setSelectedNavOption(1);
    setModalOpen(v);
  };

  const onrderNumRef = useRef();
  useEffect(() => {
    if (modalOpen && onrderNumRef.current) {
      onrderNumRef.current.focus();
    }
  }, [modalOpen]);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Transition
        className="fixed inset-0 bg-[#00000090] bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white  dark:bg-base_dark border border-transparent dark:border-[#ffffff10] max-w-4xl w-full max-h-full rounded-lg shadow-lg 
                        px-6 py-4 overflow-y-auto"
        >
          <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
            <h3 className="text-lg font-normal">New Affiliate</h3>
            <Button
              isIconOnly
              className="rounded-full "
              onClick={() => closeModal(false)}
            >
              <Cancel01Icon />
            </Button>
          </div>
          <div className="flex justify-start items-center w-full flex-wrap gap-2 mt-6">
            {NavOptions.map((i) => (
              <Button
                onClick={() => setSelectedNavOption(i.key)}
                key={i.key}
                className={`${
                  selectedNavOption === i.key
                    ? "bg-dark_selected text-white"
                    : "dark:bg-base_card dark:text-white"
                } flex justify-center gap-3 px-4 py-2 items-center rounded-full`}
              >
                {React.createElement(i.icon)}
                {i.label}
                {i.notify > 0 && (
                  <div className="flex p-2 rounded-full w-5 h-5 text-sm items-center justify-center bg-glb_red text-white">
                    {i.notify}
                  </div>
                )}
              </Button>
            ))}
          </div>
          <div className="px-4 lg:px-28">
            {selectedNavOption === 1 && (
              <motion.div
                className="min-h-[500px]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
              >
                <div className="flex flex-col gap-8 lg:flex-row my-8">
                  <div className="w-full lg:w-1/2">
                    <Input
                      type="text"
                      variant="underlined"
                      color="primary"
                      ref={onrderNumRef}
                      className="w-full"
                      classNames={{
                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],
                      }}
                      label="First name"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <Input
                      type="text"
                      variant="underlined"
                      color="primary"
                      className="w-full"
                      classNames={{
                        label: [" !text-[#00000050] dark:!text-[#FFFFFF30]"],
                      }}
                      label="Last name"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row my-8">
                  <div className="w-full lg:w-1/2">
                    <Input
                      type="email"
                      variant="underlined"
                      color="primary"
                      className="w-full"
                      classNames={{
                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],
                      }}
                      label="Email"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <Input
                      className="w-full"
                      label="Password"
                      variant="underlined"
                      color="primary"
                      placeholder="Enter your password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <ViewOffSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <ViewIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row mt-6 ">
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="#partners" className="block mr-2">
                      <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">
                        Partner
                      </span>
                      <Select
                        className="w-full"
                        selectedKeys={"1"}
                        id="partners"
                        placeholder="Select a partner"
                        labelPlacement="outside"
                        classNames={{
                          value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                          trigger:
                            "bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ",
                        }}
                      >
                        <SelectItem key={"1"}>COD Power Group</SelectItem>
                      </Select>
                    </label>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="#statut" className="block mr-2">
                      <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">
                        Statut
                      </span>
                      <Select
                        className="w-full"
                        selectedKeys={"1"}
                        id="statut"
                        placeholder="Select a statut"
                        labelPlacement="outside"
                        classNames={{
                          value: " dark:!text-[#ffffff85] !text-[#00000085]",
                          trigger:
                            "bg-transparent mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ",
                        }}
                      >
                        <SelectItem key={"1"}>Inactive</SelectItem>
                        <SelectItem key={"2"}>Active</SelectItem>
                      </Select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="#manager" className="block mr-2">
                      <span className="text-sm text-[#00000050]  dark:text-[#FFFFFF30]">
                        Manager
                      </span>
                      <Select
                        className="w-full"
                        selectedKeys={"1"}
                        id="manager"
                        placeholder="Select a manager"
                        labelPlacement="outside"
                        classNames={{
                          value: " dark:!text-[#ffffff85] !text-[#00000085]",
                          trigger:
                            "bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg",
                        }}
                      >
                        <SelectItem key={"1"}>List of Managers</SelectItem>
                      </Select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                  <div className="w-full ">
                    <Input
                      className="w-full"
                      classNames={{ input: "pointer-events-none " }}
                      label="Image"
                      variant="underlined"
                      color="primary"
                      value={image ? image.name : "Select image"}
                      placeholder="Select image"
                      endContent={
                        <>
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => handleButtonClick()}
                            aria-label="upload image"
                          >
                            <Upload04Icon className="text-2xl text-default-400 pointer-events-none" />
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </>
                      }
                      type="text"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            {selectedNavOption === 2 && (
              <motion.div
                className="min-h-[500px]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
              >
                <div className="flex flex-col gap-8 lg:flex-row mt-6 ">
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="#roles" className="block mr-2">
                      <span className="text-sm ">Role</span>
                      <Select
                        className="w-full"
                        selectedKeys={"1"}
                        id="roles"
                        placeholder="Select a role"
                        labelPlacement="outside"
                        classNames={{
                          value: " dark:!text-[#ffffff85] !text-[#00000085] ",
                          trigger:
                            "bg-transparent  mt-2 focus:border-dark_selected dark:bg-base_dark border border-[#00000030] dark:border-[#ffffff10] rounded-lg ",
                        }}
                      >
                        <SelectItem key={"1"}>Super Admin</SelectItem>
                      </Select>
                    </label>
                    <div className="mt-2 flex justify-start items-center gap-2">
                      <Switch
                        classNames={{
                          base: "h-2",
                          wrapper: "h-5",
                          thumb: "h-3 w-3 bg-[#ffffff50]",
                        }}
                        aria-label="Custom permissions"
                        size="sm"
                      />
                      <h6 className="text-sm text-[#00000050] dark:text-[#ffffff50]">
                        Custom permissions
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                  <div className="w-full lg:w-1/2">
                    <span className="text-sm ">Origin Countries</span>

                    <div className="mt-2 flex justify-start items-center gap-2">
                      <Switch
                        classNames={{
                          base: "h-2",
                          wrapper: "h-5",
                          thumb: "h-3 w-3 bg-[#ffffff50]",
                        }}
                        aria-label="All countries"
                        size="sm"
                      />
                      <h6 className="text-sm text-[#00000050] dark:text-[#ffffff50]">
                        All countries
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row mt-6">
                  <div className="w-full lg:w-1/2 ">
                    <span className="text-sm ">Warehouse</span>
                  </div>
                </div>
              </motion.div>
            )}
            {selectedNavOption === 3 && (
              <motion.div
                className="min-h-[500px]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
              >
                <div className="flex flex-col gap-8 lg:flex-row my-8">
                  <div className="w-full lg:w-1/2">
                    <Input
                      type="text"
                      labelPlacement="outside"
                      variant="bordered"
                      color="primary"
                      className="w-full"
                      classNames={{
                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],
                      }}
                      label="Type"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <Input
                      type="text"
                      labelPlacement="outside"
                      variant="bordered"
                      color="primary"
                      className="w-full"
                      classNames={{
                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],
                      }}
                      label="ID"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row my-8">
                  <div className="w-full lg:w-1/2">
                    <Input
                      type="text"
                      labelPlacement="outside"
                      
                      variant="bordered"
                      color="primary"
                      className="w-full"
                      classNames={{
                        label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],
                      }}
                      label="Username"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <Input
                      className="w-full"
                      label="Password"
                      variant="underlined"
                      color="primary"
                      placeholder="Enter your password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <ViewOffSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <ViewIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
              <Button
                className="rounded-full min-w-28 bg-blue-600 text-white px-4 py-2"
                onClick={() => closeModal(false)}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default NewAffiliateModal;
