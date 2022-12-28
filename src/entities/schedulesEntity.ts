import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./propertiesEntity";
import { User } from "./userEntity";

@Entity("schedules_users_properties")
class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Property, (property) => property.id)
  property: Property;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}

export { Schedules };
