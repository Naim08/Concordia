## Discord Backend
This is the backend for a Discord clone built with Ruby on Rails. It provides a RESTful API for the frontend to interact with.

### Getting Started
To get started with the project, you'll need to have Ruby and Rails installed on your machine. You can install them by following the instructions on the Ruby and Rails websites.

Once you have Ruby and Rails installed, you can clone the repository and install the dependencies:


## Backend
```
git clone https://github.com/your-username/discord-backend.git
cd discord-concordia
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s
```

## Frontend

```
cd frontend
npm install
npm start
```
# Feature List

Features are: chat/messaging application similar to Discord, with functionalities surrounding media management, friendships, and server channels.

**1. User Management:**
   - User Registration using email.
   - User Login using email and password.
   - User Profile: Edit profile, change profile picture, update online and custom status.
   - Session management with session tokens.

**2. Messaging:**
   - Send and receive real-time messages.
   - Edit and update messages.
   - Message status indicators (sent, received, read).

**3. Channels and Servers:**
   - Create a server with a unique name.
   - Server owner management.
   - Create channels within servers, with different types (e.g., text, voice).
   - Assign a primary or "first" channel to servers.
   - Edit server and channel details, including adding descriptions.

**4. Media Management:**
   - Upload files and media.
   - Store media metadata and attributes such as filename, content type, and size.
   - Generate unique keys for each media blob.
   - Create and manage media variants (e.g., resized or compressed versions of images).

**5. Friendships:**
   - Send and receive friend requests.
   - Accept or decline friend requests.
   - List of friends for each user.
   - Remove or block friends.

**6. Memberships:**
   - Join servers and be listed as a member.
   - Assign positions or roles to members (e.g., admin, moderator).
   - Allow members to have nicknames within servers.

**7. Notifications:**
   - Notify users of new messages, friend requests, or other important events.

**8. Server Invitations:**
   - Create unique invite links for servers to allow others to join.

**9. Security and Privacy:**
   - Password hashing using password_digest.
   - Secure media access through unique keys.

**10. Search and Filtering:**
   - Search for users, servers, or channels.
   - Filter messages or channels based on criteria.

# Schema

## Active Storage Attachments

| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| name        | string   | not null    |
| record_type | string   | not null    |
| record_id   | bigint   | not null    |
| blob_id     | bigint   | not null    |
| created_at  | datetime | not null    |

## Active Storage Blobs

| Column Name    | Data Type | Constraints |
|----------------|----------|-------------|
| key            | string   | not null    |
| filename       | string   | not null    |
| content_type   | string   |             |
| metadata       | text     |             |
| service_name   | string   | not null    |
| byte_size      | bigint   | not null    |
| checksum       | string   |             |
| created_at     | datetime | not null    |

## Active Storage Variant Records

| Column Name      | Data Type | Constraints |
|------------------|----------|-------------|
| blob_id          | bigint   | not null    |
| variation_digest | string   | not null    |

## Channels

| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| name        | string   | not null    |
| server_id   | bigint   | not null    |
| channel_type| string   | not null    |
| description | string   |             |
| created_at  | datetime | not null    |
| updated_at  | datetime | not null    |

## Friend Requests

| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| sender_id   | bigint   | not null    |
| receiver_id | bigint   | not null    |
| status      | string   | not null    |
| created_at  | datetime | not null    |
| updated_at  | datetime | not null    |

## Friends

| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| user1_id    | bigint   | not null    |
| user2_id    | bigint   | not null    |
| created_at  | datetime | not null    |
| updated_at  | datetime | not null    |

## Memberships

| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| server_id   | bigint   | not null    |
| member_id   | bigint   | not null    |
| position    | string   | not null    |
| nickname    | string   |             |
| created_at  | datetime | not null    |
| updated_at  | datetime | not null    |

## Messages

| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| body        | string   | not null    |
| channel_id  | bigint   | not null    |
| author_id   | bigint   | not null    |
| status      | string   | not null    |
| created_at  | datetime | not null    |
| updated_at  | datetime | not null    |

## Servers

| Column Name    | Data Type | Constraints |
|----------------|----------|-------------|
| name           | string   | not null    |
| owner_id       | bigint   | not null    |
| picture_url    | string   |             |
| invite_link    | string   | not null    |
| created_at     | datetime | not null    |
| updated_at     | datetime | not null    |
| first_channel_id | bigint   |             |

## Users

| Column Name        | Data Type | Constraints |
|--------------------|----------|-------------|
| email              | string   | not null    |
| username           | string   | not null    |
| password_digest    | string   | not null    |
| session_token      | string   | not null    |
| online_status      | string   | not null    |
| set_online_status  | string   | not null    |
| custom_status      | string   | not null    |
| profile_picture_url| string   | not null    |
| created_at         | datetime | not null    |
| updated_at         | datetime | not null    |



# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /users   | Returns a list of all users. |
| GET    | /users/:id | Returns a specific user. |
| POST   | /users   | Creates a new user. |
| PUT    | /users/:id | Updates a specific user. |
| DELETE | /users/:id | Deletes a specific user. |
| GET    | /servers | Returns a list of all servers. |
| GET    | /servers/:id | Returns a specific server. |
| POST   | /servers | Creates a new server. |
| PUT    | /servers/:id | Updates a specific server. |
| DELETE | /servers/:id | Deletes a specific server. |
| GET    | /servers/:id/memberships | Returns a list of all memberships for a specific server. |
| GET    | /servers/:id/memberships/:id | Returns a specific membership for a specific server. |
| POST   | /servers/:id/memberships | Creates a new membership for a specific server. |
| PUT    | /servers/:id/memberships/:id | Updates a specific membership for a specific server. |
| DELETE | /servers/:id/memberships/:id | Deletes a specific membership for a specific server. |
| GET    | /servers/:id/channels | Returns a list of all channels for a specific server. |
| GET    | /servers/:id/channels/:id | Returns a specific channel for a specific server. |
| POST   | /servers/:id/channels | Creates a new channel for a specific server. |
| PUT    | /servers/:id/channels/:id | Updates a specific channel for a specific server. |
| DELETE | /servers/:id/channels/:id | Deletes a specific channel for a specific server. |
| GET    | /channels/:id/messages | Returns a list of all messages for a specific channel. |
| GET    | /channels/:id/messages/:id | Returns a specific message for a specific channel. |
| POST   | /channels/:id/messages | Creates a new message for a specific channel. |
| PUT    | /channels/:id/messages/:id | Updates a specific message for a specific channel. |
| DELETE | /channels/:id/messages/:id | Deletes a specific message for a specific channel. |
| GET    | /users/:id/friends | Returns a list of all friends for a specific user. |
| GET    | /users/:id/friends/:id | Returns a specific friend for a specific user. |
| POST   | /users/:id/friends | Creates a new friend for a specific user. |
| PUT    | /users/:id/friends/:id | Updates a specific friend for a specific user. |
| DELETE | /users/:id/friends/:id | Deletes a specific friend for a specific user. |
| GET    | /users/:id/friend_requests | Returns a list of all friend requests for a specific user. |
| GET    | /users/:id/friend_requests/:id | Returns a specific friend request for a specific user. |
| POST   | /users/:id/friend_requests | Creates a new friend request for a specific user. |
| PUT    | /users/:id/friend_requests/:id | Updates a specific friend request for a specific user. |
| DELETE | /users/:id/friend_requests/:id | Deletes a specific friend request for a specific user. |
