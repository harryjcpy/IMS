package com.ims.util;

import com.ims.dto.AuditLogDTO;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.lang.reflect.Method;

@Aspect
@Component
public class AuditAspect {

    @Autowired
    private RestTemplate restTemplate;

    // Read from application.properties, defaults to localhost for local development
    @Value("${audit.service.url}")
    private String auditServiceUrl;

    /**
     * Pointcut that matches any method in the controller package annotated with
     * @PostMapping, @PutMapping, or @DeleteMapping.
     */
    @Pointcut("execution(* com.ims.controller..*(..)) && (" +
            "@annotation(org.springframework.web.bind.annotation.PostMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.PutMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.DeleteMapping))")
    public void auditPointcut() {
    }

    /**
     * Advice that runs after a matched method returns successfully.
     */
    @AfterReturning(pointcut = "auditPointcut()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        try {
            // 1. Capture the User ID from Spring Security
            String userId = "Anonymous";
            if (SecurityContextHolder.getContext().getAuthentication() != null) {
                userId = SecurityContextHolder.getContext().getAuthentication().getName();
            }

            // 2. Determine the Action based on the Annotation
            MethodSignature signature = (MethodSignature) joinPoint.getSignature();
            Method method = signature.getMethod();

            String action = "UNKNOWN";
            if (method.isAnnotationPresent(PostMapping.class))
                action = "CREATE";
            else if (method.isAnnotationPresent(PutMapping.class))
                action = "UPDATE";
            else if (method.isAnnotationPresent(DeleteMapping.class))
                action = "DELETE";

            // 3. Determine the Resource (Controller Name)
            String resource = joinPoint.getTarget().getClass().getSimpleName();

            // 4. Create simple details
            String details = "Successfully executed " + method.getName();

            // 5. Build the DTO
            AuditLogDTO auditLog = AuditLogDTO.builder()
                    .userId(userId)
                    .action(action)
                    .resource(resource)
                    .details(details)
                    .build();

            // 6. Send to the .NET Microservice
            // We wrap this in a separate try-catch so that if the .NET service is down,
            // the main Java application continues to function normally.
            restTemplate.postForObject(auditServiceUrl, auditLog, Object.class);

            System.out.println("[Audit Bridge] Log sent to .NET Service: " + action + " on " + resource);

        } catch (Exception e) {
            // Silently fail logging to ensure business logic remains stable
            System.err.println("[Audit Bridge Error] Could not send log to .NET Service: " + e.getMessage());
        }
    }
}
