
CREATE TABLE app_user (
  [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  [account_expired] BINARY NOT NULL,
  [account_locked] BINARY NOT NULL,
  [address] VARCHAR2(150),
  [city] varchar2(50),
  [country] VARCHAR2(100),
  [postal_code] VARCHAR2(15),
  [province] VARCHAR2(100),
  [credentials_expired] BINARY,
  [email] VARCHAR2(255) NOT NULL,
  [account_enabled] BINARY,
  [first_name] VARCHAR2(50) NOT NULL,
  [last_name] VARCHAR2(50) NOT NULL,
  [password] VARCHAR2(255) NOT NULL,
  [password_hint] VARCHAR2(255),
  [phone_number] VARCHAR2(255),
  [username] VARCHAR2(50) NOT NULL,
  [version] INTEGER,
  [website] VARCHAR2(255)
);

CREATE UNIQUE INDEX [email] ON [app_user] ([email]);

CREATE UNIQUE INDEX [username] ON [app_user] ([username]);

CREATE TABLE [role] (
  [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  [description] VARCHAR2(64),
  [name] VARCHAR2(20)
);

CREATE TABLE [user_role] (
[user_id] INTEGER NOT NULL CONSTRAINT [user_id] REFERENCES [app_user]([id]),
[role_id] INTEGER NOT NULL CONSTRAINT [role_id] REFERENCES [role]([id]),
CONSTRAINT [] PRIMARY KEY ([user_id], [role_id]));

CREATE INDEX [user_id] ON [user_role] ([user_id]);

CREATE INDEX [role_id] ON [user_role] ([role_id]);

insert into app_user(id,account_expired,account_locked,address,city,country,postal_code,province,credentials_expired,email,account_enabled,first_name,last_name,password,password_hint,phone_number,username,version,website)
values (-4,0,0,'','Denver','US','80210','CO',0,'user4@company.com',1,'user4','user4','$2a$10$CnQVJ9bsWBjMpeSKrrdDEeuIptZxXrwtI6CZ/OgtNxhIgpKxXeT9y','A male kitty.','','user4',1,'http://tomcat.apache.org');

insert into app_user(id,account_expired,account_locked,address,city,country,postal_code,province,credentials_expired,email,account_enabled,first_name,last_name,password,password_hint,phone_number,username,version,website)
values (-3,0,0,'','Denver','US','80210','CO',0,'two_roles_user@appfuse.org',1,'Two Roles','User','$2a$10$bH/ssqW8OhkTlIso9/yakubYODUOmh.6m5HEJvcBq3t3VdBh7ebqO','Not a female kitty.','','two_roles_user',1,'http://raibledesigns.com');

insert into app_user(id,account_expired,account_locked,address,city,country,postal_code,province,credentials_expired,email,account_enabled,first_name,last_name,password,password_hint,phone_number,username,version,website)
values (-2,0,0,'','Denver','US','80210','CO',0,'matt@raibledesigns.com',1,'Matt','Raible','$2a$10$bH/ssqW8OhkTlIso9/yakubYODUOmh.6m5HEJvcBq3t3VdBh7ebqO','Not a female kitty.','','admin',1,'http://raibledesigns.com');

insert into app_user(id,account_expired,account_locked,address,city,country,postal_code,province,credentials_expired,email,account_enabled,first_name,last_name,password,password_hint,phone_number,username,version,website)
values (-1,0,0,'','Denver','US','80210','CO',0,'matt_raible@yahoo.com',1,'Tomcat','User','$2a$10$CnQVJ9bsWBjMpeSKrrdDEeuIptZxXrwtI6CZ/OgtNxhIgpKxXeT9y','A male kitty.','','user',1,'http://tomcat.apache.org');

insert into role(id,description,name)
values (-2,'test descr','ROLE_USER');

insert into role(id,description,name)
values (-1,'Administrator role (can edit Users)','ROLE_ADMIN');

insert into user_role(user_id,role_id) values (-3,-2);
insert into user_role(user_id,role_id) values (-3,-1);
insert into user_role(user_id,role_id) values (-2,-1);
insert into user_role(user_id,role_id) values (-1,-2);





