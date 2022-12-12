<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use App\Service\ChatHelper;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/chat/{chat}', name: 'chat_getMessages', methods: 'GET')]
    #[IsGranted('ROLE_USER')]
    public function getTopicMessages(ChatRepository $chatRepository, $chat): JsonResponse
    {
        /** @var User $userLogged */
        $userLogged = $this->getUser();
        $user = $this->getUser();
        $chat = $chatRepository->findOneBy(['chat' => $chat]);

        $chatHelper->checkAccessChat($id);

        if ($chat->getTopic() !== ($user->getId() . '.' . $userLogged->getId())) {
            throw new HttpException(Response::HTTP_FORBIDDEN);
        }
        $messageCollection = $chat->getMessages();

        return $this->json(['message' => $messageCollection], context: ['group' => 'default']);
    }

    #[Route('/chat/{id}/send-message', name: 'chat_sendMessage', methods: 'POST')]
    public function createMessage($id, EntityManagerInterface $em, UserRepository $repository, ChatHelper $chatHelper)
    {

        /** @var User $userLogged */
        $userLogged = $this->getUser();
        $user = $repository->find($id);

        //helper pour check s'il a bien les droits pour envoyer un message sur ce chat
        $chatHelper->checkAccessChat($id);
        $chat->setTopic($user->getId() . '.' . $userLogged->getId());

        $message = new Message();
        $message
            ->setChat($chat)
            ->setUser($userLogged)
            ->setContent('');

        $em->persist($message);
        $em->flush();
    }

    #[Route('/chat/{chat}', name: 'chat_getMessages', methods: 'GET')]
    #[IsGranted('ROLE_USER')]
    public function getListTopics(ChatRepository $chatRepository, $chat): JsonResponse
    {
        /** @var User $userLogged */
        $userLogged = $this->getUser();
        $user = $this->getUser();
        $chat = $chatRepository->findOneBy(['chat' => $chat]);

        $chatHelper->checkAccessChat($id);

        if ($chat->getTopic() !== ($user->getId() . '.' . $userLogged->getId())) {
            throw new HttpException(Response::HTTP_FORBIDDEN);
        }
        $messageCollection = $chat->getMessages();

        return $this->json(['message' => $messageCollection], context: ['group' => 'default']);
    }
}