INSERT INTO department (name)
VALUES
 ('Sales'),
 ('Engineering');

INSERT INTO roles (title, department_id, salary)
VALUES
  ('Sales Lead', 1, '100000'),
  ('Sales Person', 1, '70000'),
  ('Lead Engineer', 2, '140000');


INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('James', 'Fraser', 1 ),
  ('Jack', 'London',2 ),
  ('Robert', 'Bruce', 3),
  ('Peter', 'Greenaway', 1 ),
  ('Derek', 'Jarman', 2),
  ('Paolo', 'Pasolini', 3),
  ('Heathcote', 'Williams', 2),
  ('Sandy', 'Powell', 1),
  ('Emil', 'Zola', 3),
  ('Sissy', 'Coalpits',2 ),
  ('Antoinette', 'Capet', 1),
  ('Samuel', 'Delany', 2);