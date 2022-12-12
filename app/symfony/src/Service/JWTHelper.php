<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHelper
{
    private string $mercureSecret;

    public function __construct(string $mercureSecret)
    {
        $this->mercureSecret = $mercureSecret;
    }

    public function createJWT(User $user): string
    {
        $payload = ["mercure" => [
            "subscribe" => ["https://example.com/user/{$user->getId()}"],
            "payload" => [
                "username" => $user->getUsername(),
                "userid" => $user->getId()
            ]
        ]];

        return JWT::encode($payload, $this->mercureSecret, 'HS256');
    }

    public function isJwtValid(string $jwt): bool
    {
        try {
            return (bool)JWT::decode($jwt, new Key($this->mercureSecret, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
    }

    public function decodeJwt(string $jwt)
    {
        if (!$this->isJwtValid($jwt)) {
        }
        try {
            return JWT::decode($jwt, new Key($this->mercureSecret, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
    }

    public function getUsernameFromToken(string $token) {

        $decoded = $this->decodeJwt($token);
        return $decoded->mercure->payload->username;
    }
}