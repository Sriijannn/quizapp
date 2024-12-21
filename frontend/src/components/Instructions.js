import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardHead from "./DashboardHead";

function Instructions() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("Please stay on the dashboard during the test.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="lg:overflow-hidden w-full flex flex-col justify-start items-center bg-[#F0F3F7] relative">
      <DashboardHead />
      <div className="flex flex-col gap-6 justify-start items-start px-3 py-4 md:px-8 md:py-6 w-full h-full">
        <p className="w-full text-center underline text-base lg:text-xl font-bold text-[#2F84C3]">
          INSTRUCTIONS
        </p>
        <div className="w-full flex flex-col gap-2">
          <div className=" text-base lg:text-base underline font-semibold text-[#2F84C3]">
            General Rules:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2 "></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              The quiz is time-bound(40 mins). Ensure you complete all questions
              within the allotted time. You will need a pen and paper for the
              quiz, so keep them handy before starting.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2 "></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              The Quiz is divided into three sections:{" "}
              <b>Logical Thinking, Critical Thinking, and Basic Programming.</b>
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2 "></div>

            <div className="w-full">
              <p className="text-[12px] lg:text-base w-[90%]">
                There are three states for a question:
              </p>
              <p className="text-[12px] lg:text-base w-[90%]">
                <b>Submitted: </b> The answer has been provided and saved.
              </p>
              <p className="text-[12px] lg:text-base w-[90%]">
                <b>Not Answered:</b> The question is yet to be answered.
              </p>
              <p className="text-[12px] lg:text-base w-[90%]">
                <b>Marked for Later: </b> The question is flagged for review and
                can be answered later.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2 "></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Read each question carefully before answering.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2 "></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Make sure to submit the quiz after completing the quiz by clicking
              on the <b> End test</b> button
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2 "></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Make sure to click on <b>Save and Next</b> after answering each
              question to save your progress.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-base lg:text-base underline font-semibold text-[#2F84C3]">
            Technical Requirements:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Use a stable internet connection to avoid disruptions during the
              quiz. The quiz is compatible with desktops, laptops, and mobile
              devices.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Ensure your device is charged and notifications are turned off to
              avoid distractions.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              If disconnected due to a network issue, you can log in again to
              complete the quiz. Your progress will be saved automatically.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-base lg:text-base underline font-semibold text-[#2F84C3]">
            Behavior and Conduct:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Fair play is expected; any form of cheating or assistance from
              others is prohibited. Do not share your login credentials with
              anyone.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Opening new tabs, switching windows, or using external resources
              during the quiz would lead to warning, several warnings will
              result in automatic submission of the quiz.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Multiple levels of malpractice prevention have been implemented in
              the quiz portal. Avoid any attempt to bypass these measures.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-base lg:text-base underline font-semibold text-[#2F84C3]">
            Scoring and Evaluation:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Each correct answer awards +4 point.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              There is negative marking of -1 for incorrect answer.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-base lg:text-base underline font-semibold text-[#2F84C3]">
            Time Management:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              A timer will be displayed on the screen to help you manage your
              time effectively. If the timer runs out, your quiz will be
              automatically submitted.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-base lg:text-base underline font-semibold text-[#2F84C3]">
            Help and Support:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              In case of any technical issues, contact the teacher in charge of
              the quiz immediately.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-base lg:text-base underline font-semibold text-[#2F84C3]">
            Miscellaneous:
          </div>
          <div className="flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-black mt-2"></div>
            <p className="text-[12px] lg:text-base w-[90%]">
              Decisions made by the organizing committee regarding any disputes
              are final.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center px-4 py-4">
        <button
          class="w-full lg:w-auto flex justify-center items-center gap-2 text-base font-bold px-8 py-4 rounded-lg bg-[#2F84C3] text-white"
          onClick={handleContinue}
        >
          <p>Start the Quiz</p>
        </button>
      </div>
    </div>
  );
}

export default Instructions;
