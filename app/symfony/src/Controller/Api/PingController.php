<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Service\CookieHelper;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api/ping', name: 'api_ping_')]
class PingController extends AbstractController
{
    #[Route('/{user}', name: 'ping_user', methods: 'POST')]
    #[isGranted('ROLE_USER', message: 'Vous devez être connecté pour pouvoir ping un utilisateur')]
    public function pingUser(User $user, HubInterface $hub)
    {
        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId()
            ]),
            true
        );
//send to mercure
        $hub->publish($update);

        return $this->json([
            'message' => 'Ping sent'
        ]);
    }
}