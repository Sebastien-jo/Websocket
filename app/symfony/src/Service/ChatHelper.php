<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\User;
use App\Repository\ChatRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use function Symfony\Component\String\b;

class ChatHelper
{
    public function __construct(private readonly ChatRepository $chatRepository, private readonly Security $security, EntityManagerInterface $em)
    {
    }

    /**
     * @throws \Exception
     */
    public function hasAccessChat(Chat $chat)
    {
        $user = $this->security->getUser();
        $topic = explode('.', $chat->getTopic());

        $bool = array_map(function ($userId) use ($user) {
            return $userId == $user->getId();
        }, $topic);

        return $bool ?? throw new \Exception('Vous n\'avez pas accès à ce chat');
    }

    /**
     * @param array<User> $recipient
     * @return Chat
     */
    public function getChat(array $recipient): Chat
    {
        array_push($recipient, $this->security->getUser());
        sort($recipient);
        $topic = implode('.', array_map(fn(User $user) => $user->getId(), $recipient));
        $chat = $this->chatRepository->findOneBy(['topic' => $topic]);

        if (!$chat) {
            $chat = new Chat();
            $chat->setTopic($topic);
            return $chat;
        }

        return $chat;
    }

    /**
     * @param array<User> $recipient
     * @return Chat
     */
    public function getListPublishChat(Chat $chat): array
    {
        $listPublish = [];
        $baseUri = 'https://example.com/user/';

        $usersId = explode('.', $chat->getTopic());
        $userlogged = $this->security->getUser()->getId();

        foreach ($usersId as $userId) {
            if ($userId != $userlogged) {
                $listPublish[] = $baseUri . $userId;
            }
        }
        return $listPublish;
    }

    private function getUserListChat(Chat $chat): Collection
    {
        $topic = explode('.', $chat->getTopic());
        $userCollection = $this->em->getRepository(User::class)->findBy(['id' => $topic]);

        return $userCollection;
    }
}
