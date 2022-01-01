from rest_framework import filters, permissions

class PublicEndpoint(permissions.BasePermission):
    def has_permission(self, request, view):
        return True