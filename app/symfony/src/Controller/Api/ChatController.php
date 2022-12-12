<?php

namespace App\Controller\Api;

use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Service\ChatHelper;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/chat', name: 'api_chat_')]
class ChatController extends AbstractController
{
    public function __construct(private ChatHelper $chatHelper, private EntityManagerInterface $em)
    {
    }

    #[Route('/{topic}', name: 'chat_getMessages', methods: 'GET')]
    #[IsGranted('ROLE_USER')]
    public function getTopicMessages(ChatRepository $chatRepository, string $topic): JsonResponse
    {
        $chat = $chatRepository->findOneByTopic($topic);

        if (!$chat) {
            throw new HttpException(Response::HTTP_NOT_FOUND);
        }

        $this->chatHelper->hasAccessChat($chat);
        $messageCollection = $chat->getMessages();


        return $this->json(['message' => $messageCollection], context: ['groups' => 'get:chat']);
    }

    #[Route('/send-message', name: 'chat_sendMessage', methods: 'POST')]
    public function createMessage(Request $request, HubInterface $hub)
    {
        $content = $request->get('content');
        $recipientList = $request->get('recipient');
        $recipientList = explode(';', $recipientList);

        /** @var User $userLogged */
        $userLogged = $this->getUser();
        $recipientCollection = $this->em->getRepository(User::class)->findBy(['username' => $recipientList]);


        $chat = $this->chatHelper->getChat($recipientCollection);

        //helper pour check s'il a bien les droits pour envoyer un message sur ce chat
        try {
            $this->chatHelper->hasAccessChat($chat);
        } catch (HttpException $e) {
            throw new HttpException(Response::HTTP_UNAUTHORIZED);
        }


        $message = new Message();
        $message
            ->setChat($chat)
            ->setUser($userLogged)
            ->setContent($content)
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());

        $this->em->persist($message);
        $this->em->flush();

        $listPublish = $this->chatHelper->getListPublishChat($chat);
        $listPublish[] = "https://example.com/my-private-topic";

        $hub->publish(new Update(
            $listPublish,
            $this->json([
                'message' => $message,
                'sender' => $userLogged->getUsername(),
                'recipient' => $recipientList,
                'topic' => $chat->getTopic()
            ], context: ['groups' => 'get:chat']),
            false,
        ));

        return $this->json(['message' => "Message envoyé"], context: ['groups' => 'get:chat']);
    }

    #[Route('/user/{id}', name: 'chat_getPrivateMessages', methods: 'GET')]
    #[IsGranted('ROLE_USER')]
    public function getPrivateTopicMessages(ChatRepository $chatRepository, $id): JsonResponse
    {
        /** @var User $userLogged
         */

        $userLogged = $this->getUser();
        $user2 = $this->em->getRepository(User::class)->find($id);
        $chat = $this->chatHelper->getChat([$user2]);

        $messageCollection = $chat->getMessages();

        return $this->json(['id' => $chat->getTopic(), 'message' => $messageCollection], context: ['groups' => 'get:chat']);
    }
}
