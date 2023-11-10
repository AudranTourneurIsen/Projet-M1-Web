import { Injectable } from '@nestjs/common';
import { Comment } from 'library-api/src/entities';
import {
  CommentRepositoryOutput,
  CreateCommentRepositoryInput,
} from 'library-api/src/repositories/comments/comment.repository.type';
import { adaptCommentEntityToCommentModel } from 'library-api/src/repositories/comments/comment.utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(public readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  /**
   * Create a new comment
   * @param comment Comment to create
   * @returns Created comment
   */

  public async createComment(
    comment: CreateCommentRepositoryInput,
  ): Promise<CommentRepositoryOutput> {
    const createdComment = await this.save(comment);

    return adaptCommentEntityToCommentModel(createdComment);
  }
}
