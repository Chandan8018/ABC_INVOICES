import { Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { View } from "../data/data";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

function ViewQuiz() {
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [quizzes, setQuizzes] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quiz/getQuizzes`);
        const data = await res.json();
        if (res.ok) {
          setQuizzes(data.quizzes);
          if (data.quizzes.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchQuizzes();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(`/api/quiz/getQuizzes?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.quizzes]);
        if (data.quizzes.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteQize = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/quiz/delete/${quizIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setQuizzes((prev) =>
          prev.filter((quiz) => quiz._id !== quizIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='min-h-screen w-[92vw] dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center'>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20 z-10'
        fill={theme === "dark" ? "white" : "#13C6F7"}
      />
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      <div className='table-auto overflow-x-scroll md:mx-auto'>
        <div className='flex justify-center'>
          <TypewriterEffectSmooth words={View} />
        </div>

        {currentUser.isAdmin && quizzes.length > 0 && (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Quiz Id
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Quiz Question
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Option 1
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Option 2
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Option 3
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Option 4
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>Answer</Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>Delete</Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>Edit</Table.HeadCell>
              </Table.Head>
              {quizzes.map((quiz) => (
                <Table.Body className='divide-y' key={quiz._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                    <Table.Cell>{quiz._id}</Table.Cell>
                    <Table.Cell>{quiz.question}</Table.Cell>
                    <Table.Cell>{quiz.option1}</Table.Cell>
                    <Table.Cell>{quiz.option2}</Table.Cell>
                    <Table.Cell>{quiz.option3}</Table.Cell>
                    <Table.Cell>{quiz.option4}</Table.Cell>
                    <Table.Cell>
                      <span className='bg-[#5bd552] text-black font-semibold rounded-sm'>
                        {quiz.answer}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        borderRadius='1.75rem'
                        className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 cursor-pointer'
                        type='button'
                        onClick={() => {
                          setShowModal(true);
                          setQuizIdToDelete(quiz._id);
                        }}
                      >
                        <MdDelete className='w-7 h-7 text-[#ff5555]' />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/update-quiz/${quiz._id}`}
                        className='text-teal-500'
                      >
                        <Button
                          borderRadius='1.75rem'
                          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8 cursor-pointer'
                          type='button'
                        >
                          <FaEdit className='w-6 h-6 text-blue-500' />
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-black dark:text-teal-500 font-bold self-center text-sm py-7 hover:text-blue-600'
              >
                Show more
              </button>
            )}
          </>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this post?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteQize}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ViewQuiz;
