<?php

namespace App\Entity;

use App\Entity\Traits\TimestampableTrait;
use App\Repository\MessageRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['main', 'get:chat'])]
    #[ORM\Column(nullable: false)]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['get:chat'])]
    private ?user $user = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['get:chat'])]
    private ?string $content = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Chat $chat = null;

    public function setID(?id $id): ?int
    {
        $this->id = $id;
        return $this;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getChat(): ?Chat
    {
        return $this->chat;
    }

    public function setChat(?Chat $chat): self
    {
        $this->chat = $chat;

        return $this;
    }


}
