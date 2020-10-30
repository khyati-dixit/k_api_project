using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Student.DTO;

namespace Student.Entity
{
    public class EntityValues
    {
        private readonly string _connectionString;
        public EntityValues(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<List<Student1>> GetAll()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAll", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<Student1>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToValue(reader));
                        }
                    }

                    return response;
                }
            }
        }
        private Student1 MapToValue(SqlDataReader reader)
        {
            return new Student1()
            {
                id = (int)reader["id"],
                name = reader["name"].ToString(),
                email = reader["email"].ToString(),
                address = reader["address"].ToString(),
                phone = (int)reader["phone"],
                password = reader["password"].ToString(),
                gender = reader["gender"].ToString(),
                technology = reader["technology"].ToString(),
            };
        }

        public async Task<bool> Insert(Student1 value)
        {

            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spAddStudent", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@name", value.name));
                    cmd.Parameters.Add(new SqlParameter("@address", value.address));
                    cmd.Parameters.Add(new SqlParameter("@phone", value.phone));
                    cmd.Parameters.Add(new SqlParameter("@email", value.email));                   
                    cmd.Parameters.Add(new SqlParameter("@password", value.password));
                    cmd.Parameters.Add(new SqlParameter("@gender", value.gender));
                    cmd.Parameters.Add(new SqlParameter("@technology", value.technology));

                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }

        }
        public async Task<bool> UpdateDetails(Student1 smodel)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spUpdateStudent", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", smodel.id);
                    cmd.Parameters.AddWithValue("@name", smodel.name);
                    cmd.Parameters.AddWithValue("@address", smodel.address);
                    cmd.Parameters.AddWithValue("@phone", smodel.phone);
                    cmd.Parameters.AddWithValue("@email", smodel.email);
                    cmd.Parameters.AddWithValue("@password", smodel.password);
                    cmd.Parameters.AddWithValue("@gender", smodel.gender);
                    cmd.Parameters.AddWithValue("@technology", smodel.technology);
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }


            }
        }
        public async Task<Student1> GetById(int Id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sdGetById", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@id", Id));
                    Student1 response = null;
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response = MapToValue(reader);
                        }
                    }

                    return response;
                }
            }
        }
        public async Task DeleteById(int Id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDeleteStudent", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@id", Id));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return;
                }
            }
        }
    }
}
