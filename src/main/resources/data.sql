INSERT INTO roles(id, name) VALUES (1,'ROLE_USER') ON CONFLICT (id) DO UPDATE SET name = 'ROLE_USER';
INSERT INTO roles(id, name) VALUES (2,'ROLE_MOD') ON CONFLICT (id) DO UPDATE SET name = 'ROLE_MOD';
INSERT INTO roles(id, name) VALUES (3,'ROLE_ADMIN') ON CONFLICT (id) DO UPDATE SET name = 'ROLE_ADMIN';

