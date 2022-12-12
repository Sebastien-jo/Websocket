<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/user', name: 'api_user_')]
class UserController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    #[Route('/list', name: 'user_list')]
    public function userList()
    {
        /**
         * @var User $user
         */

        $user = $this->getUser();
        $userRepository = $this->em->getRepository(User::class);
        $userCollection = $userRepository->getAllButMe($user);

        return $this->json(
            ['users' => $userCollection,
                'tot' => "je suis un toto "]
            , 200,
            [],
            ['groups' => 'main']);
    }
}