<?php

namespace App\Security;

use App\Service\JWTHelper;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class JWTAuthenticator extends AbstractAuthenticator {

    public function __construct( UrlGeneratorInterface $urlGenerator, private JWTHelper $jwtHelper) {
    }

    public function supports(Request $request): ?bool {
        
        return !empty(getallheaders()['Authorization']);
    }

    public function authenticate(Request $request): Passport {
        $token = str_replace('Bearer ', '', getallheaders()['Authorization']);

        if ($this->jwtHelper->isJwtValid($token)) {
            return new SelfValidatingPassport(new UserBadge($this->jwtHelper->getUsernameFromToken($token)));
        }

        throw new CustomUserMessageAuthenticationException('Invalid JWT');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response {

        //return JSON response with error message
        return new Response(json_encode(['message' => 'Authentification échoué']), 401);
    }
}
