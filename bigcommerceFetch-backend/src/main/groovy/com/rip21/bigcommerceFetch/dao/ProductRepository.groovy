package com.rip21.bigcommerceFetch.dao

import com.rip21.bigcommerceFetch.domain.Product
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.rest.core.annotation.RestResource

@RestResource(exported = false)
interface ProductRepository extends MongoRepository<Product, Long> {

}