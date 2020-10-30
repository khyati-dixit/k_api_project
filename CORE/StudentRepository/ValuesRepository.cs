using Microsoft.Extensions.Configuration;
using Student.Entity;
using Student.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;

namespace StudentRepository
{
    public class ValuesRepository
    {
        private readonly EntityValues _entity;
        public ValuesRepository(EntityValues entityValues)
        {
            _entity = entityValues;
        }

        public async Task<List<Students>> GetAll()
        {
            var userDTO = new List<Students>();
            var usersList = await _entity.GetAll();
            userDTO.AddRange(
             usersList.Select(x => new Students
             {
                 id = x.id,
                 name=x.name,
                 phone = x.phone,
                 address = x.address,
                 email = x.email,
                 gender = x.gender,
                 technology = x.technology
             }).ToList());
            return userDTO;

        }


     

        public async Task<bool> Insert(Students insert)
        {
            var newuser = new Student1()
            {
               name=insert.name,
               gender=insert.gender,
               address=insert.address,
               phone=insert.phone,
               technology=insert.technology,
               email=insert.email,
               password=insert.password
            };
            var result = await _entity.Insert(newuser);
            return result;
        }

        public async Task<Students> GetById(int id)
        {

            var us = await _entity.GetById(id);
            var newuser = new Students()
            {
                id = us.id,
                name=us.name,
                gender=us.gender,
                address=us.address,
                phone=us.phone,
                technology=us.technology,
                email=us.email
            };
            return newuser;

        }
        public async Task<bool> UpdateDetails(Students users)
        {
            var newuser = new Student1()
            {
                id = users.id,
                name = users.name,
                gender=users.gender,
                address=users.address,
                phone = users.phone,
                technology =users.technology,
                email=users.email
            };
            var result=await _entity.UpdateDetails(newuser);
            return true;
        }
        public async Task<bool> DeleteById(int id)
        {
            await _entity.DeleteById(id);
            return true;
        }



    }
}
