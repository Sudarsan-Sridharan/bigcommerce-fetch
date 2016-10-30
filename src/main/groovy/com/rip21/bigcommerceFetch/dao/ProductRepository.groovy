package com.rip21.bigcommerceFetch.dao

import com.rip21.bigcommerceFetch.domain.Product
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository extends MongoRepository<Product, Long> {

}